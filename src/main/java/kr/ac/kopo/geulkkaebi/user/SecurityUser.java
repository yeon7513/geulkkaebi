package kr.ac.kopo.geulkkaebi.user;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

// 스프링 시큐리티용 DTO
public class SecurityUser implements UserDetails {
  private String username;
  private String password;
  private boolean accountNonLocked;
  private boolean enabled;
  private Collection<? extends GrantedAuthority> authorities;

  public SecurityUser(User user) {
    this.username = user.getUserId();
    this.password = user.getUserPw();
    this.accountNonLocked = user.getSuspendYn() == 0;
    this.enabled = user.getDeleteYn() == 0;
    this.authorities =
        List.of(new SimpleGrantedAuthority(user.getAdminYn() == 1 ? "ROLE_ADMIN" : "ROLE_USER"));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return accountNonLocked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }
}
