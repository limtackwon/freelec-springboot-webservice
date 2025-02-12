package com.range.book.springboot.web;

import com.range.book.springboot.config.auth.LoginUser;
import com.range.book.springboot.config.auth.dto.SessionUser;
import com.range.book.springboot.service.posts.PostsService;
import com.range.book.springboot.web.dto.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;
import java.text.AttributedString;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final PostsService postsService;

    @GetMapping("/")
    public String index(Model model, @LoginUser SessionUser user){
        model.addAttribute("posts",postsService.findAllDesc());

        if(user != null){
            model.addAttribute("user",user);
        }
        return "index";
    }

    @GetMapping("/bridge")
    public String bridge(Model model, @LoginUser SessionUser user){
        return "bridge";
    }

    @GetMapping("/posts/save")
    public String postsSave(){return "posts-save";}

    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id,Model model){
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post",dto);

        return "posts-update";
    }
}
