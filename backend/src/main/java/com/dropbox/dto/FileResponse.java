package com.dropbox.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileResponse {
    private String fileName;
    private String contentType;
    private long size;
    private LocalDateTime uploadedAt;
}

