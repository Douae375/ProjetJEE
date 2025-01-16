package com.Controle.salary_service.batch;

import com.Controle.salary_service.service.SalaireService;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration

public class BatchConfig {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;

    public BatchConfig(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        this.jobRepository = jobRepository;
        this.transactionManager = transactionManager;
    }

    @Bean
    public Job calculSalaireJob(Step calculStep) {
        return new JobBuilder("calculSalaireJob", jobRepository)
                .start(calculStep)
                .build();
    }

    @Bean
    public Step calculStep(SalaireService salaireService) {
        return new StepBuilder("calculSalaireStep", jobRepository)
                .tasklet((contribution, chunkContext) -> {
                    salaireService.calculerTousLesSalaires();
                    return RepeatStatus.FINISHED;
                }, transactionManager)
                .build();
    }
}
