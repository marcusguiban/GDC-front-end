import React, { useState } from 'react';

const CreateDentalChartPage = () => {
  const [patient, setPatient] = useState('');
  const [teeth, setTeeth] = useState('');

  const handlePatientChange = (event) => {
    setPatient(event.target.value);
  };

  const handleTeethChange = (event) => {
    setTeeth(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create dental chart API call
    const createDentalChart = async () => {
      try {
        const response = await fetch('/api/dentalCharts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patient: patient,
            teeth: teeth,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Dental chart created:', data.msg);
          // Handle success, e.g., display a success message or redirect to another page
        } else {
          console.log('Failed to create dental chart.');
          // Handle error, e.g., display an error message
        }
      } catch (error) {
        console.log('Error:', error.message);
        // Handle error, e.g., display an error message
      }
    };

    createDentalChart();
  };

  return (
    <div>
      <h1>Create Dental Chart</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Patient:
          <input type="text" value={patient} onChange={handlePatientChange} />
        </label>
        <br />
        <label>
          Teeth:
          <input type="text" value={teeth} onChange={handleTeethChange} />
        </label>
        <br />
        <button type="submit">Create Dental Chart</button>
      </form>
    </div>
  );
};

export default CreateDentalChartPage;