package rw.transport.vubaride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"rw.transport.vubaride.model"})
@EnableJpaRepositories(basePackages = {"rw.transport.vubaride.repository"})
public class VubaRideApplication {
    public static void main(String[] args) {
        SpringApplication.run(VubaRideApplication.class, args);
    }
}