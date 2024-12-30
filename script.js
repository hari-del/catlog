// Function to decode a value from a given base to decimal
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to calculate the Lagrange interpolation to find the constant term (f(0))
function lagrangeInterpolation(points) {
    let secret = 0;

    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let L = 1;

        // Calculate L_i(0)
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj, _] = points[j];
                L *= -xj / (xi - xj);
            }
        }

        secret += yi * L; // Add the contribution of this term to the secret
    }

    return secret;
}

// Function to read and process the input JSON data
function readInput(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;

    const points = [];
    for (const key in jsonData) {
        if (key !== 'keys') {
            const base = parseInt(jsonData[key].base);
            const value = jsonData[key].value;
            const x = parseInt(key);
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }

    // We need exactly k points for the interpolation
    return points.slice(0, k);
}

// Function to find the secret (constant term) from the points
function findSecret(points) {
    return lagrangeInterpolation(points);
}

// Main function to handle the entire process
function main() {
    // Read and process the first test case (test_case_1.json)
    fetch('test_case_1.json')
        .then(response => response.json())
        .then(jsonData => {
            const points = readInput(jsonData);
            const secret = findSecret(points);
            console.log(`Secret from test case 1: ${secret}`);
        })
        .catch(error => console.error('Error reading test_case_1.json:', error));

    // Read and process the second test case (test_case_2.json)
    fetch('test_case_2.json')
        .then(response => response.json())
        .then(jsonData => {
            const points = readInput(jsonData);
            const secret = findSecret(points);
            console.log(`Secret from test case 2: ${secret}`);
        })
        .catch(error => console.error('Error reading test_case_2.json:', error));
}

// Run the main function
main();
