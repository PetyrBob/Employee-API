const express = require('express');
const app = express();
const PORT = 3000;

// Handle GET request to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to our API for CSPI101: System Integration and Architecture 1-MIDTERM EXAM, just type this to view the Employees -localhost:3000/employees- SALAMAT :) By: Domogma and Pabellosa.');
});


// Middleware to parse JSON data
app.use(express.json());

// Sample data with 7 employees
let employees = [
    {
        id: 35524,
        name: 'Ron Vincent Cada',
        email: 'ronvincentcada@example.com',
        sex: 'Male',
        birthdate: '1990-01-01',
        mobile: '09318332070',
        address: '123 Main St, Manila, PH',
        position: 'Software Engineer',
        department: 'IT',
        salary: 50000,
        dateHired: '2022-01-01'
    },
    {
        id: 37009,
        name: 'Gabriel Ballesteros',
        email: 'gabrielballesteros@example.com',
        sex: 'Male',
        birthdate: '1992-05-10',
        mobile: '09633650835',
        address: '456 Oak St, Quezon City, PH',
        position: 'HR Manager',
        department: 'HR',
        salary: 60000,
        dateHired: '2021-03-15'
    },
    {
        id: 37973,
        name: 'Eyre Vincent Gonzales',
        email: 'eyrevincentgonzales@example.com',
        sex: 'Male',
        birthdate: '1985-08-22',
        mobile: '09674313555',
        address: '789 Pine St, Makati, PH',
        position: 'Marketing Specialist',
        department: 'Marketing',
        salary: 45000,
        dateHired: '2020-11-30'
    },
    {
        id: 33909,
        name: 'Neo Martin Medrano',
        email: 'neomartenmedrano@example.com',
        sex: 'Male',
        birthdate: '1993-11-11',
        mobile: '09201234567',
        address: '135 Maple St, Pasig, PH',
        position: 'Sales Executive',
        department: 'Sales',
        salary: 48000,
        dateHired: '2022-07-01'
    },
    {
        id: 36954,
        name: 'Mike Andrei Gomez',
        email: 'mikeandreigomez@example.com',
        sex: 'Male',
        birthdate: '1988-02-18',
        mobile: '09817332433',
        address: '246 Cedar St, Taguig, PH',
        position: 'Accountant',
        department: 'Finance',
        salary: 53000,
        dateHired: '2019-09-10'
    },
    {
        id: 36823,
        name: 'Nikko Errol Samson',
        email: 'nikkoerrolsamson@example.com',
        sex: 'Male',
        birthdate: '1996-06-05',
        mobile: '09292605263',
        address: '357 Birch St, Mandaluyong, PH',
        position: 'Legal Officer',
        department: 'Legal',
        salary: 62000,
        dateHired: '2021-04-12'
    },
    {
        id: 37881,
        name: 'Rolf Eluigi Arriola',
        email: 'rolfeluigiarriola@example.com',
        sex: 'Male',
        birthdate: '1979-09-30',
        mobile: '09856117524',
        address: '468 Palm St, Paranaque, PH',
        position: 'Chief Operations Officer',
        department: 'Operations',
        salary: 120000,
        dateHired: '2018-01-20'
    }
];

// Helper function to generate the next sequential ID
const getNextId = () => {
    const ids = employees.map(emp => emp.id);
    return Math.max(...ids) + 1;
};

// GET all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// GET single employee by ID
app.get('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(e => e.id === id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
});

// POST create a new employee
app.post('/employees', (req, res) => {
    const newEmployee = {
        id: getNextId(),
        ...req.body
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// PUT update an employee (full update)
app.put('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(e => e.id === id);
    if (index !== -1) {
        employees[index] = { id, ...req.body };
        res.json(employees[index]);
    } else {
        res.status(404).send('Employee not found');
    }
});

// PATCH update an employee (partial update)
app.patch('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(e => e.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...req.body };
        res.json(employees[index]);
    } else {
        res.status(404).send('Employee not found');
    }
});

// DELETE an employee
app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(e => e.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
