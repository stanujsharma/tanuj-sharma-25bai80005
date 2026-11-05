
package com.example.cicd.service;

import com.example.cicd.model.Post;
import org.springframework.stereotype.Service;

@Service
public class ContractValidationService {

    public boolean validatePost(Post post) {

        if (post == null) {
            return false;
        }

        if (post.getTitle() == null || post.getTitle().isBlank()) {
            return false;
        }

        if (post.getContent() == null || post.getContent().isBlank()) {
            return false;
        }

        if (post.getAuthor() == null || post.getAuthor().isBlank()) {
            return false;
        }

        return true;
    }

    public String getValidationMessage(Post post) {

        if (post == null) {
            return "Post cannot be null";
        }

        if (post.getTitle() == null || post.getTitle().isBlank()) {
            return "Title is required";
        }

        if (post.getContent() == null || post.getContent().isBlank()) {
            return "Content is required";
        }

        if (post.getAuthor() == null || post.getAuthor().isBlank()) {
            return "Author is required";
        }

        return "Post contract is valid";
    }
}
