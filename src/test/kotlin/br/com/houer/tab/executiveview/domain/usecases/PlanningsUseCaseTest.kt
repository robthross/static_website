package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.Planning
import br.com.houer.tab.executiveview.domain.repository.PlanningsRepository
import io.mockk.every
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(MockKExtension::class)
class PlanningsUseCaseTest {

    @RelaxedMockK
    lateinit var planningsRepository: PlanningsRepository

    lateinit var planningsUseCase: PlanningsUseCase

    @BeforeEach
    fun setUp() {
        planningsUseCase = PlanningsUseCase(planningsRepository)
    }

    @Test
    fun findBy() {
        every { planningsRepository.findBy("id") } returns Planning(id = "id", name = "id_name")
        val planning = planningsUseCase.findBy("id")

        assertEquals("id_name", planning!!.name)
    }
}
