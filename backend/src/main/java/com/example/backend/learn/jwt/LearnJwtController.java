package com.example.backend.learn.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/learn/jwt")
@RequiredArgsConstructor
public class LearnJwtController {

    private final JwtEncoder jwtEncoder;

    @GetMapping("sub3")
    // 유효한 토큰이 있는 요청만 실행 가능 아니면 401 응답
    // @PreAuthorize는 configuration 에 @EnableMethodSecurity 있어야 함
    @PreAuthorize("isAuthenticated()")
    public String sub3(Authentication authentication) {
        System.out.println("LearnJwtController.sub3");

        return null;
    }

    // Authentication 객체를 request handler method 파라미터에 두면
    // jwt가 유효하면 name속성이 subject(jwt)인 Authentication 객체를 대입
    //       아니면 null을 대입
    @GetMapping("sub2")
    public String sub2(Authentication authentication) {
        System.out.println("LearnJwtController.sub2");
        if (authentication == null) {
            System.out.println("로그인 안했거나 유효하지 않은 토큰");
        } else {
            System.out.println(authentication.getName());
        }


        return "";
    }

    @PostMapping("sub1")
    public String sub1(@RequestBody Map<String, String> data) {
        System.out.println("email = " + data.get("email"));
        System.out.println("password = " + data.get("password"));

        // jwt 토큰 완성
        // sign어떻게.정보(claim,payload).sign

        // claim/payload 에 민감한 정보 담지 않기

        // 꼭 작성해야 하는 claim들 (4개)
        // 어디서 발행 Issuer (iss)
        // 누구를 위한 토큰 Subject (sub)
        // 언제 만들었는 지 Issued At (iat)
        // 언제까지 유효한 지 Expiration Time (exp)

        // 우리가 필요한 것 (1개)
        // 권한 Scope (scp)

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
//                .claim("sub", data.get("email"))
                .subject(data.get("email"))

//                .claim("iss", "self")
                .issuer("self")

//                .claim("iat", Instant.now())
                .issuedAt(Instant.now())

//                .claim("exp", Instant.now().plusSeconds(60 * 60 * 24 * 365))
                .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 365))

                .claim("scp", "admin user manager") // space로 구분
                .build();

        // jwt 응답
        return jwtEncoder
                .encode(JwtEncoderParameters.from(claimsSet))
                .getTokenValue();
    }
}
