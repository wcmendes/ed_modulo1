function showCode(tabId) {
    // Hide all code tabs
    const codeTabs = document.querySelectorAll(".code-tab");
    codeTabs.forEach(tab => {
        tab.classList.remove("active");
    });

    // Deactivate all tab buttons
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach(button => {
        button.classList.remove("active");
    });

    // Show the selected code tab
    document.getElementById(tabId).classList.add("active");

    // Activate the clicked tab button
    const clickedButton = document.querySelector(`[onclick="showCode('${tabId}')"]`);
    if (clickedButton) {
        clickedButton.classList.add("active");
    }
}

// String Simulator
function runStringSimulator() {
    const input = document.getElementById('stringInput').value;
    const output = document.getElementById('stringOutput');
    
    if (!input.trim()) {
        output.innerHTML = "Por favor, digite uma string.";
        return;
    }
    
    const results = [];
    
    // Operações básicas com strings
    results.push(`<strong>String original:</strong> "${input}"`);
    results.push(`<strong>Tamanho:</strong> ${input.length} caracteres`);
    results.push(`<strong>Maiúscula:</strong> "${input.toUpperCase()}"`);
    results.push(`<strong>Minúscula:</strong> "${input.toLowerCase()}"`);
    results.push(`<strong>Primeira letra maiúscula:</strong> "${input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()}"`);
    
    // Contagem de vogais
    const vogais = input.toLowerCase().match(/[aeiou]/g);
    const numVogais = vogais ? vogais.length : 0;
    results.push(`<strong>Número de vogais:</strong> ${numVogais}`);
    
    // Inversão da string
    const stringInvertida = input.split('').reverse().join('');
    results.push(`<strong>String invertida:</strong> "${stringInvertida}"`);
    
    // Verificação de palíndromo
    const isPalindromo = input.toLowerCase().replace(/\s/g, '') === 
                        input.toLowerCase().replace(/\s/g, '').split('').reverse().join('');
    results.push(`<strong>É palíndromo?</strong> ${isPalindromo ? 'Sim' : 'Não'}`);
    
    output.innerHTML = results.join('<br>');
}

// Vector Simulator
function runVectorSimulator() {
    const input = document.getElementById('vectorInput').value;
    const output = document.getElementById('vectorOutput');
    
    if (!input.trim()) {
        output.innerHTML = "Por favor, digite números separados por vírgula.";
        return;
    }
    
    try {
        // Converter entrada em array de números
        const numbers = input.split(',').map(num => {
            const parsed = parseFloat(num.trim());
            if (isNaN(parsed)) {
                throw new Error(`"${num.trim()}" não é um número válido`);
            }
            return parsed;
        });
        
        const results = [];
        
        // Informações básicas do vetor
        results.push(`<strong>Vetor:</strong> [${numbers.join(', ')}]`);
        results.push(`<strong>Tamanho:</strong> ${numbers.length} elementos`);
        
        // Estatísticas
        const soma = numbers.reduce((acc, num) => acc + num, 0);
        const media = soma / numbers.length;
        const maior = Math.max(...numbers);
        const menor = Math.min(...numbers);
        
        results.push(`<strong>Soma:</strong> ${soma}`);
        results.push(`<strong>Média:</strong> ${media.toFixed(2)}`);
        results.push(`<strong>Maior elemento:</strong> ${maior}`);
        results.push(`<strong>Menor elemento:</strong> ${menor}`);
        
        // Ordenação
        const crescente = [...numbers].sort((a, b) => a - b);
        const decrescente = [...numbers].sort((a, b) => b - a);
        
        results.push(`<strong>Ordenado (crescente):</strong> [${crescente.join(', ')}]`);
        results.push(`<strong>Ordenado (decrescente):</strong> [${decrescente.join(', ')}]`);
        
        // Elementos pares e ímpares
        const pares = numbers.filter(num => num % 2 === 0);
        const impares = numbers.filter(num => num % 2 !== 0);
        
        results.push(`<strong>Elementos pares:</strong> [${pares.join(', ') || 'Nenhum'}]`);
        results.push(`<strong>Elementos ímpares:</strong> [${impares.join(', ') || 'Nenhum'}]`);
        
        output.innerHTML = results.join('<br>');
        
    } catch (error) {
        output.innerHTML = `<span style="color: red;">Erro: ${error.message}</span>`;
    }
}

// Matrix Simulator
function runMatrixSimulator() {
    const input = document.getElementById('matrixInput').value;
    const output = document.getElementById('matrixOutput');
    
    if (!input.trim()) {
        output.innerHTML = "Por favor, digite uma matriz (ex: 1,2,3\\n4,5,6).";
        return;
    }
    
    try {
        // Converter entrada em matriz
        const lines = input.trim().split('\n');
        const matrix = lines.map((line, lineIndex) => {
            const numbers = line.split(',').map(num => {
                const parsed = parseFloat(num.trim());
                if (isNaN(parsed)) {
                    throw new Error(`"${num.trim()}" na linha ${lineIndex + 1} não é um número válido`);
                }
                return parsed;
            });
            return numbers;
        });
        
        // Verificar se todas as linhas têm o mesmo número de colunas
        const numCols = matrix[0].length;
        if (!matrix.every(row => row.length === numCols)) {
            throw new Error("Todas as linhas devem ter o mesmo número de colunas");
        }
        
        const results = [];
        const numRows = matrix.length;
        
        // Informações básicas da matriz
        results.push(`<strong>Matriz ${numRows}x${numCols}:</strong>`);
        matrix.forEach((row, i) => {
            results.push(`Linha ${i}: [${row.join(', ')}]`);
        });
        
        // Soma total
        const somaTotal = matrix.flat().reduce((acc, num) => acc + num, 0);
        results.push(`<strong>Soma total:</strong> ${somaTotal}`);
        
        // Soma das linhas
        results.push(`<strong>Soma das linhas:</strong>`);
        matrix.forEach((row, i) => {
            const somaLinha = row.reduce((acc, num) => acc + num, 0);
            results.push(`  Linha ${i}: ${somaLinha}`);
        });
        
        // Soma das colunas
        results.push(`<strong>Soma das colunas:</strong>`);
        for (let j = 0; j < numCols; j++) {
            const somaColuna = matrix.reduce((acc, row) => acc + row[j], 0);
            results.push(`  Coluna ${j}: ${somaColuna}`);
        }
        
        // Diagonal principal (se for matriz quadrada)
        if (numRows === numCols) {
            const diagonal = matrix.map((row, i) => row[i]);
            const somaDiagonal = diagonal.reduce((acc, num) => acc + num, 0);
            results.push(`<strong>Diagonal principal:</strong> [${diagonal.join(', ')}]`);
            results.push(`<strong>Soma da diagonal:</strong> ${somaDiagonal}`);
            
            // Diagonal secundária
            const diagonalSec = matrix.map((row, i) => row[numCols - 1 - i]);
            const somaDiagonalSec = diagonalSec.reduce((acc, num) => acc + num, 0);
            results.push(`<strong>Diagonal secundária:</strong> [${diagonalSec.join(', ')}]`);
            results.push(`<strong>Soma da diagonal secundária:</strong> ${somaDiagonalSec}`);
        }
        
        // Matriz transposta
        const transposta = matrix[0].map((_, colIndex) => 
            matrix.map(row => row[colIndex])
        );
        results.push(`<strong>Matriz transposta ${numCols}x${numRows}:</strong>`);
        transposta.forEach((row, i) => {
            results.push(`Linha ${i}: [${row.join(', ')}]`);
        });
        
        output.innerHTML = results.join('<br>');
        
    } catch (error) {
        output.innerHTML = `<span style="color: red;">Erro: ${error.message}</span>`;
    }
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// Add some interactive examples based on the course material
function demonstrateStringOperations() {
    const examples = [
        "Estrutura de Dados",
        "Programação",
        "Algoritmos",
        "JavaScript"
    ];
    
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    document.getElementById('stringInput').value = randomExample;
    runStringSimulator();
}

function demonstrateVectorOperations() {
    const examples = [
        "85, 92, 78, 95, 88",
        "10, 5, 8, 3, 12, 7",
        "1, 2, 3, 4, 5",
        "100, 85, 90, 78, 92"
    ];
    
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    document.getElementById('vectorInput').value = randomExample;
    runVectorSimulator();
}

function demonstrateMatrixOperations() {
    const examples = [
        "1,2,3\n4,5,6\n7,8,9",
        "10,20\n30,40",
        "1,0,0\n0,1,0\n0,0,1",
        "5,3,8\n2,7,1\n9,4,6"
    ];
    
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    document.getElementById('matrixInput').value = randomExample;
    runMatrixSimulator();
}


// Exercise functions
function exerciseVowelCounter() {
    document.getElementById('stringInput').value = "Estrutura de Dados";
    runStringSimulator();
    // Scroll to strings section
    document.getElementById('strings').scrollIntoView({ behavior: 'smooth' });
}

function exerciseSubstring() {
    document.getElementById('stringInput').value = "Programação";
    runStringSimulator();
    document.getElementById('strings').scrollIntoView({ behavior: 'smooth' });
}

function exerciseEvenOdd() {
    document.getElementById('vectorInput').value = "1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
    runVectorSimulator();
    document.getElementById('vetores').scrollIntoView({ behavior: 'smooth' });
}

function exerciseMatrix3x3() {
    document.getElementById('matrixInput').value = "1,2,3\n4,5,6\n7,8,9";
    runMatrixSimulator();
    document.getElementById('matrizes').scrollIntoView({ behavior: 'smooth' });
}

// Student system (based on course challenge)
let students = [];

function addStudent() {
    const nameInput = document.getElementById('studentName');
    const gradeInput = document.getElementById('studentGrade');
    const output = document.getElementById('studentSystemOutput');
    
    const name = nameInput.value.trim();
    const grade = parseFloat(gradeInput.value);
    
    if (!name) {
        output.innerHTML = '<span style="color: red;">Por favor, digite o nome do aluno.</span>';
        return;
    }
    
    if (isNaN(grade) || grade < 0 || grade > 10) {
        output.innerHTML = '<span style="color: red;">Por favor, digite uma nota válida (0-10).</span>';
        return;
    }
    
    if (students.length >= 10) {
        output.innerHTML = '<span style="color: red;">Limite de 10 alunos atingido.</span>';
        return;
    }
    
    // Check if student already exists
    if (students.some(student => student.name.toLowerCase() === name.toLowerCase())) {
        output.innerHTML = '<span style="color: red;">Aluno já cadastrado.</span>';
        return;
    }
    
    students.push({ name, grade });
    nameInput.value = '';
    gradeInput.value = '';
    
    output.innerHTML = `<span style="color: green;">Aluno "${name}" cadastrado com nota ${grade}.</span>`;
}

function calculateClassAverage() {
    const output = document.getElementById('studentSystemOutput');
    
    if (students.length === 0) {
        output.innerHTML = '<span style="color: red;">Nenhum aluno cadastrado.</span>';
        return;
    }
    
    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const average = total / students.length;
    
    output.innerHTML = `<strong>Média da turma:</strong> ${average.toFixed(2)} (${students.length} alunos)`;
}

function searchStudent() {
    const output = document.getElementById('studentSystemOutput');
    const searchName = prompt("Digite o nome do aluno para buscar:");
    
    if (!searchName) {
        output.innerHTML = '<span style="color: red;">Busca cancelada.</span>';
        return;
    }
    
    const student = students.find(s => s.name.toLowerCase() === searchName.toLowerCase());
    
    if (student) {
        output.innerHTML = `<strong>Aluno encontrado:</strong> ${student.name} - Nota: ${student.grade}`;
    } else {
        output.innerHTML = '<span style="color: red;">Aluno não encontrado.</span>';
    }
}

function listStudents() {
    const output = document.getElementById('studentSystemOutput');
    
    if (students.length === 0) {
        output.innerHTML = '<span style="color: red;">Nenhum aluno cadastrado.</span>';
        return;
    }
    
    let result = '<strong>Lista de Alunos:</strong><br>';
    students.forEach((student, index) => {
        result += `${index + 1}. ${student.name} - Nota: ${student.grade}<br>`;
    });
    
    output.innerHTML = result;
}

function clearStudents() {
    if (students.length === 0) {
        document.getElementById('studentSystemOutput').innerHTML = '<span style="color: red;">Lista já está vazia.</span>';
        return;
    }
    
    if (confirm('Tem certeza que deseja limpar toda a lista de alunos?')) {
        students = [];
        document.getElementById('studentSystemOutput').innerHTML = '<span style="color: green;">Lista de alunos limpa.</span>';
    }
}


// Interactive Playground Functions

// String Playground Functions
function playgroundConcatenate() {
    const text1 = document.getElementById('stringPlayground1').value;
    const text2 = document.getElementById('stringPlayground2').value;
    const result = text1 + text2;
    updatePlaygroundResult('playgroundStringResult', `Concatenação: "${result}"`);
}

function playgroundLength() {
    const text1 = document.getElementById('stringPlayground1').value;
    const text2 = document.getElementById('stringPlayground2').value;
    updatePlaygroundResult('playgroundStringResult', 
        `Tamanho do Texto 1: ${text1.length}\nTamanho do Texto 2: ${text2.length}`);
}

function playgroundUppercase() {
    const text1 = document.getElementById('stringPlayground1').value;
    const text2 = document.getElementById('stringPlayground2').value;
    updatePlaygroundResult('playgroundStringResult', 
        `Texto 1 em maiúscula: "${text1.toUpperCase()}"\nTexto 2 em maiúscula: "${text2.toUpperCase()}"`);
}

function playgroundLowercase() {
    const text1 = document.getElementById('stringPlayground1').value;
    const text2 = document.getElementById('stringPlayground2').value;
    updatePlaygroundResult('playgroundStringResult', 
        `Texto 1 em minúscula: "${text1.toLowerCase()}"\nTexto 2 em minúscula: "${text2.toLowerCase()}"`);
}

function playgroundReverse() {
    const text1 = document.getElementById('stringPlayground1').value;
    const text2 = document.getElementById('stringPlayground2').value;
    const reversed1 = text1.split('').reverse().join('');
    const reversed2 = text2.split('').reverse().join('');
    updatePlaygroundResult('playgroundStringResult', 
        `Texto 1 invertido: "${reversed1}"\nTexto 2 invertido: "${reversed2}"`);
}

function playgroundSubstring() {
    const text1 = document.getElementById('stringPlayground1').value;
    const substring = text1.substring(0, 5);
    updatePlaygroundResult('playgroundStringResult', 
        `Substring (0-5) do Texto 1: "${substring}"`);
}

function playgroundSearch() {
    const text1 = document.getElementById('stringPlayground1').value;
    const text2 = document.getElementById('stringPlayground2').value;
    const positions1 = [];
    const positions2 = [];
    
    for (let i = 0; i < text1.length; i++) {
        if (text1[i].toLowerCase() === 'a') positions1.push(i);
    }
    for (let i = 0; i < text2.length; i++) {
        if (text2[i].toLowerCase() === 'a') positions2.push(i);
    }
    
    updatePlaygroundResult('playgroundStringResult', 
        `Posições da letra "a" no Texto 1: [${positions1.join(', ')}]\nPosições da letra "a" no Texto 2: [${positions2.join(', ')}]`);
}

function playgroundVowelCount() {
    const text1 = document.getElementById('stringPlayground1').value;
    const text2 = document.getElementById('stringPlayground2').value;
    const vowels = 'aeiouAEIOU';
    
    const count1 = text1.split('').filter(char => vowels.includes(char)).length;
    const count2 = text2.split('').filter(char => vowels.includes(char)).length;
    
    updatePlaygroundResult('playgroundStringResult', 
        `Vogais no Texto 1: ${count1}\nVogais no Texto 2: ${count2}`);
}

// Vector Playground Functions
let currentVector = [10, 20, 30, 40, 50];

function updateVectorDisplay() {
    document.getElementById('vectorDisplay').textContent = `[${currentVector.join(', ')}]`;
}

function vectorInsertEnd() {
    const newElement = parseInt(document.getElementById('vectorNewElement').value);
    if (!isNaN(newElement)) {
        currentVector.push(newElement);
        updateVectorDisplay();
        updatePlaygroundResult('playgroundVectorResult', 
            `Elemento ${newElement} inserido no final.\nVetor atual: [${currentVector.join(', ')}]`);
    }
}

function vectorInsertPosition() {
    const newElement = parseInt(document.getElementById('vectorNewElement').value);
    const position = parseInt(document.getElementById('vectorPosition').value);
    
    if (!isNaN(newElement) && !isNaN(position) && position >= 0 && position <= currentVector.length) {
        currentVector.splice(position, 0, newElement);
        updateVectorDisplay();
        updatePlaygroundResult('playgroundVectorResult', 
            `Elemento ${newElement} inserido na posição ${position}.\nVetor atual: [${currentVector.join(', ')}]`);
    } else {
        updatePlaygroundResult('playgroundVectorResult', 'Posição inválida ou elemento inválido!');
    }
}

function vectorRemovePosition() {
    const position = parseInt(document.getElementById('vectorPosition').value);
    
    if (!isNaN(position) && position >= 0 && position < currentVector.length) {
        const removedElement = currentVector.splice(position, 1)[0];
        updateVectorDisplay();
        updatePlaygroundResult('playgroundVectorResult', 
            `Elemento ${removedElement} removido da posição ${position}.\nVetor atual: [${currentVector.join(', ')}]`);
    } else {
        updatePlaygroundResult('playgroundVectorResult', 'Posição inválida!');
    }
}

function vectorSearch() {
    const element = parseInt(document.getElementById('vectorNewElement').value);
    if (!isNaN(element)) {
        const index = currentVector.indexOf(element);
        if (index !== -1) {
            updatePlaygroundResult('playgroundVectorResult', 
                `Elemento ${element} encontrado na posição ${index}.`);
        } else {
            updatePlaygroundResult('playgroundVectorResult', 
                `Elemento ${element} não encontrado no vetor.`);
        }
    }
}

function vectorSort() {
    const sortedVector = [...currentVector].sort((a, b) => a - b);
    currentVector = sortedVector;
    updateVectorDisplay();
    updatePlaygroundResult('playgroundVectorResult', 
        `Vetor ordenado: [${currentVector.join(', ')}]`);
}

function vectorReverse() {
    currentVector.reverse();
    updateVectorDisplay();
    updatePlaygroundResult('playgroundVectorResult', 
        `Vetor invertido: [${currentVector.join(', ')}]`);
}

function vectorSum() {
    const sum = currentVector.reduce((acc, val) => acc + val, 0);
    const average = sum / currentVector.length;
    updatePlaygroundResult('playgroundVectorResult', 
        `Soma total: ${sum}\nMédia: ${average.toFixed(2)}\nQuantidade de elementos: ${currentVector.length}`);
}

function vectorReset() {
    currentVector = [10, 20, 30, 40, 50];
    updateVectorDisplay();
    updatePlaygroundResult('playgroundVectorResult', 'Vetor resetado para valores iniciais.');
}

// Matrix Playground Functions
function getMatrixValues() {
    const matrix = [];
    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = parseInt(document.getElementById(`m${i}${j}`).value) || 0;
        }
    }
    return matrix;
}

function updateMatrix() {
    // This function is called when matrix values change
    // We can add real-time updates here if needed
}

function matrixSumTotal() {
    const matrix = getMatrixValues();
    let sum = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            sum += matrix[i][j];
        }
    }
    updatePlaygroundResult('playgroundMatrixResult', `Soma total da matriz: ${sum}`);
}

function matrixSumRows() {
    const matrix = getMatrixValues();
    let result = 'Soma das linhas:\n';
    for (let i = 0; i < 3; i++) {
        let rowSum = 0;
        for (let j = 0; j < 3; j++) {
            rowSum += matrix[i][j];
        }
        result += `Linha ${i}: ${rowSum}\n`;
    }
    updatePlaygroundResult('playgroundMatrixResult', result);
}

function matrixSumColumns() {
    const matrix = getMatrixValues();
    let result = 'Soma das colunas:\n';
    for (let j = 0; j < 3; j++) {
        let colSum = 0;
        for (let i = 0; i < 3; i++) {
            colSum += matrix[i][j];
        }
        result += `Coluna ${j}: ${colSum}\n`;
    }
    updatePlaygroundResult('playgroundMatrixResult', result);
}

function matrixDiagonalPrincipal() {
    const matrix = getMatrixValues();
    let sum = 0;
    let elements = [];
    for (let i = 0; i < 3; i++) {
        sum += matrix[i][i];
        elements.push(matrix[i][i]);
    }
    updatePlaygroundResult('playgroundMatrixResult', 
        `Diagonal principal: [${elements.join(', ')}]\nSoma: ${sum}`);
}

function matrixDiagonalSecundaria() {
    const matrix = getMatrixValues();
    let sum = 0;
    let elements = [];
    for (let i = 0; i < 3; i++) {
        sum += matrix[i][2-i];
        elements.push(matrix[i][2-i]);
    }
    updatePlaygroundResult('playgroundMatrixResult', 
        `Diagonal secundária: [${elements.join(', ')}]\nSoma: ${sum}`);
}

function matrixTranspose() {
    const matrix = getMatrixValues();
    let result = 'Matriz transposta:\n';
    for (let j = 0; j < 3; j++) {
        let row = [];
        for (let i = 0; i < 3; i++) {
            row.push(matrix[i][j]);
        }
        result += `[${row.join(', ')}]\n`;
    }
    updatePlaygroundResult('playgroundMatrixResult', result);
}

function matrixReset() {
    const defaultValues = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`m${i}${j}`).value = defaultValues[i][j];
        }
    }
    updatePlaygroundResult('playgroundMatrixResult', 'Matriz resetada para valores padrão.');
}

function matrixRandomFill() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const randomValue = Math.floor(Math.random() * 20) + 1;
            document.getElementById(`m${i}${j}`).value = randomValue;
        }
    }
    updatePlaygroundResult('playgroundMatrixResult', 'Matriz preenchida com valores aleatórios (1-20).');
}

// Utility function to update playground results with animation
function updatePlaygroundResult(elementId, text) {
    const element = document.getElementById(elementId);
    element.textContent = text;
    element.classList.remove('updated');
    setTimeout(() => element.classList.add('updated'), 10);
}

