<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flood Monitoring</title>
    <script>
        async function sendToTeams(data) {
            const webhookUrl = 'https://outlook.office.com/webhook/your-webhook-url'; // Replace with your MS Teams webhook URL
            const message = {
                "@type": "MessageCard",
                "@context": "http://schema.org/extensions",
                "themeColor": "0076D7",
                "summary": "Flood Alert",
                "sections": [{
                    "activityTitle": "Flood Data Alert",
                    "activitySubtitle": "Areas with severity below the specified threshold",
                    "facts": data.map(item => ({
                        "name": "Location",
                        "value": `${item.location} - Severity: ${item.severity}`
                    })),
                    "markdown": true
                }]
            };

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message),
                });
                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
                alert("Message sent to Teams successfully.");
            } catch (error) {
                console.error('Error sending to Teams:', error);
                alert('Error sending message to Teams.');
            }
        }

        async function fetchFloodData() {
            const threshold = parseFloat(document.getElementById('threshold').value);
            if (isNaN(threshold)) {
                alert('Please enter a valid threshold');
                return;
            }

            try {
                // Query the flood monitoring API
                const response = await fetch('https://example.com/floods'); // Replace with your actual flood monitoring API URL
                const floodData = await response.json();

                // Filter the flood data based on the severity threshold
                const filteredData = floodData.filter(item => item.severity < threshold);

                if (filteredData.length > 0) {
                    sendToTeams(filteredData);
                } else {
                    alert('No flood data found below the specified threshold.');
                }
            } catch (error) {
                console.error('Error fetching flood data:', error);
                alert('Error fetching flood data.');
            }
        }
    </script>
</head>
<body>
    <h1>Flood Monitoring Web App</h1>
    <label for="threshold">Enter flood severity threshold:</label>
    <input type="number" id="threshold" placeholder="Enter severity threshold" min="0" step="0.1">
    <button onclick="fetchFloodData()">Get Flood Data</button>

    <p id="status"></p>

</body>
</html>
