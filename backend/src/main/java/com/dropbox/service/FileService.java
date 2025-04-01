package com.dropbox.service;

import com.dropbox.dto.FileResponse;
import com.dropbox.model.FileMetadata;
import com.dropbox.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final FileMetadataRepository repository;

    public FileService(FileMetadataRepository repository) {
        this.repository = repository;
    }

    public void uploadFile(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename == null || filename.isEmpty()) throw new RuntimeException("Invalid file name");

        String ext = filename.substring(filename.lastIndexOf('.') + 1);
        if (!List.of("txt", "jpg", "png", "json").contains(ext)) {
            throw new RuntimeException("Unsupported file format");
        }

        Path targetPath = Paths.get(uploadDir).resolve(filename);
        Files.createDirectories(targetPath.getParent());
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        FileMetadata metadata = FileMetadata.builder()
                .fileName(filename)
                .contentType(file.getContentType())
                .size(file.getSize())
                .uploadedAt(LocalDateTime.now())
                .build();

        repository.save(metadata);
    }

    public List<FileResponse> listFiles() {
        return repository.findAll().stream()
                .map(f -> new FileResponse(f.getFileName(), f.getContentType(), f.getSize(), f.getUploadedAt()))
                .collect(Collectors.toList());
    }

    public byte[] downloadFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        if (!Files.exists(filePath)) {
            throw new RuntimeException("File not found");
        }
        return Files.readAllBytes(filePath);
    }
} FileService {
    
}
