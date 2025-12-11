package kr.ac.kopo.geulkkaebi.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import kr.ac.kopo.geulkkaebi.global.image.ImageService;

@Service
public class UserServiceImpl implements UserService {

  // 이미지 처리용 서비스
  @Autowired
  private ImageService imageService;

  @Autowired
  UserDao userDao;

  // 회원 전체 조회
  @Override
  public List<User> selectList() {
    return userDao.selectList();
  }

  // 한 명의 회원 조회 (로그인한 회원)
  @Override
  public User selectOne(String userId) {
    return userDao.selectOne(userId);
  }

  // 회원 등록 (회원가입)
  @Override
  public User insert(User user, MultipartFile flie) {
    String filePath;

    try {
      // 파일 업로드 유무 확인
      if (flie != null && !flie.isEmpty()) {
        // 파일을 업로드 했을 경우
        filePath = imageService.uploadImage(flie, "profile");
      } else {
        // 파일을 업로드 하지 않았을 경우, 기본 이미지 랜덤 생성
        int randomNum = (int) (Math.random() * 3) + 1;
        filePath = "/uploads/default/random_profile_" + randomNum + ".png";
      }

      // 파일 객체를 경로로 변환해 저장
      user.setProfileImg(filePath);

      // DB에 저장
      int result = userDao.insert(user);
      if (result == 0) {
        System.out.println("회원 가입 실패");
      }

      // DB에서 저장된 사용자 조회
      User savedUser = userDao.selectOne(user.getUserId());

      return savedUser;
    } catch (Exception e) {
      return null;
    }
  }

  // 회원 정보 변경
  @Override
  public User update(User user, MultipartFile flie) {
    try {
      // 이미지 업로드 처리
      if (flie != null && !flie.isEmpty()) {
        String filePath = imageService.uploadImage(flie, "profile");
        user.setProfileImg(filePath);
      }

      // DB 업데이트
      int result = userDao.update(user);
      if (result == 0) {
        System.out.println("정보 변경 실패");
      }

      // DB에서 변경된 데이터 조회
      User updatedUser = userDao.selectOne(user.getUserId());

      return updatedUser;
    } catch (Exception e) {
      System.out.println(e);
      return null;
    }
  }

  // 회원 퀴즈 점수 갱신
  @Override
  public void updateUserScore(String userId, int score) {

    Map<String, Object> params = new HashMap<>();
    params.put("userId", userId);
    params.put("score", score);

    userDao.updateUserScore(params);

  }

  // 회원 탈퇴
  @Override
  public int delete(String userId) {
    return userDao.delete(userId);
  }

  // 게시글 + 댓글 작성으로 회원 등급 상승
  @Override
  public void updateUserGrade(String writerId) {
    userDao.updateUserGrade(writerId);
  }



}
