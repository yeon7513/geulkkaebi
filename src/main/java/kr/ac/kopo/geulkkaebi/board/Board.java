package kr.ac.kopo.geulkkaebi.board;

import org.apache.ibatis.type.Alias;

@Alias("boardDto")
public class Board {
  private String boardType;
  private String creator;
  private String createdAt;
  private String modifier;
  private String modifierAt;
  private String status;

  public String getBoardType() {
    return boardType;
  }

  public void setBoardType(String boardType) {
    this.boardType = boardType;
  }

  public String getCreator() {
    return creator;
  }

  public void setCreator(String creator) {
    this.creator = creator;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getModifier() {
    return modifier;
  }

  public void setModifier(String modifier) {
    this.modifier = modifier;
  }

  public String getModifierAt() {
    return modifierAt;
  }

  public void setModifierAt(String modifierAt) {
    this.modifierAt = modifierAt;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

}
