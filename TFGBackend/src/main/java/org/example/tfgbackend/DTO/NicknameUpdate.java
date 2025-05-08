package org.example.tfgbackend.DTO;

public class NicknameUpdate {
    private Integer id;
    private String nickname;

    public NicknameUpdate(String nickname, Integer id) {
        this.nickname = nickname;
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
