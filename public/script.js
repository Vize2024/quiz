document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        let answers = [];

        for (const value of formData.values()) {
            answers.push(value);
        }

        // Calculando o total de respostas para cada categoria (A, B, C)
        const categories = ['A', 'B', 'C'];
        const categoryCounts = {};

        for (const category of categories) {
            categoryCounts[category] = answers.filter(answer => answer === category).length;
        }

        // Configurando os dados do gráfico de teia de aranha
        const data = {
            labels: categories,
            datasets: [{
                label: 'Personalidade do Empreendedor',
                data: Object.values(categoryCounts),
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                pointBackgroundColor: 'rgba(0, 123, 255, 1)'
            }]
        };

        // Configurando as opções do gráfico de teia de aranha
        const config = {
            type: 'radar',
            data: data,
            options: {
                scales: {
                    r: {
                        min: 0,
                        max: Math.max(...Object.values(categoryCounts)) + 1, // Ajuste para garantir espaço suficiente para as legendas
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        };

        // Renderizando o gráfico de teia de aranha
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, config);

        // Exibindo o resultado do quiz
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = `
            <h2>Resultado do Quiz:</h2>
            <p>Personalidade de Empreendedor: ${getEntrepreneurPersonality(categoryCounts)}</p>
        `;
    });

    // Função para determinar a personalidade do empreendedor com base nas respostas
    function getEntrepreneurPersonality(categoryCounts) {
        const maxCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);
        switch (maxCategory) {
            case 'A':
                return 'Conservador e Cauteloso';
            case 'B':
                return 'Equilibrado e Estratégico';
            case 'C':
                return 'Arrojado e Visionário';
            default:
                return 'Indefinido';
        }
    }
});
