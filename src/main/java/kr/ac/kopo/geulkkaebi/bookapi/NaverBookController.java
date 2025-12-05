package kr.ac.kopo.geulkkaebi.bookapi;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import kr.ac.kopo.geulkkaebi.global.constants.BaseUrl;

@RestController
@RequestMapping("/naverBook")
public class NaverBookController {

  @Value("${naver.client.id}")
  private String clientId;
  @Value("${naver.client.secret}")
  private String clientSecret;

  @GetMapping("/search")
  public ResponseEntity<?> search(@RequestParam(required = false) String title,
      @RequestParam(required = false, defaultValue = "8") int display,
      @RequestParam(required = false) String isbn) throws Exception {
    String baseUrl = BaseUrl.getNaverBookApiUrl();

    StringBuilder url = new StringBuilder(baseUrl);

    if (title != null) {
      url.append("d_titl=").append(URLEncoder.encode(title, "UTF-8"));
    }

    if (display > 0) {
      url.append("&display=").append(display);
    }

    if (isbn != null) {
      url.append("&d_isbn=").append(isbn);
    }

    HttpURLConnection con = (HttpURLConnection) new URL(url.toString()).openConnection();
    con.setRequestMethod("GET");
    con.setRequestProperty("X-Naver-Client-Id", clientId);
    con.setRequestProperty("X-Naver-Client-Secret", clientSecret);

    BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
    StringBuilder sb = new StringBuilder();
    String line;
    while ((line = br.readLine()) != null)
      sb.append(line);
    br.close();

    String xmlResponse = sb.toString();

    // XML → JSON 변환
    JSONObject json = XML.toJSONObject(xmlResponse);

    return ResponseEntity.ok(json.toMap());
  }
}
