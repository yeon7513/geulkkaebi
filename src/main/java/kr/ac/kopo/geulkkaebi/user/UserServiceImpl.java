package kr.ac.kopo.geulkkaebi.user;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import kr.ac.kopo.geulkkaebi.grobal.image.ImageService;

@Service
public class UserServiceImpl implements UserService {

  // 이미지 처리용 서비스
  @Autowired
  private ImageService imageService;

  @Autowired
  UserDao userDao;

  @Override
  public List<User> selectList() {
    return userDao.selectList();
  }

  @Override
  public User selectOne(String userId) {
    return userDao.selectOne(userId);
  }

  @Override
  public int insert(User user, MultipartFile flie) {
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

      return userDao.insert(user);
    } catch (Exception e) {
      return 0;
    }
  }

  @Override
  public int update(User user, MultipartFile flie) {
    try {
      if (flie != null && !flie.isEmpty()) {
        String filePath = imageService.uploadImage(flie, "profile");
        user.setProfileImg(filePath);
      }

      return userDao.update(user);
    } catch (Exception e) {
      System.out.println(e);
      return 0;
    }
  }

  @Override
  public int delete(String userId) {
    return userDao.delete(userId);
  }


}
