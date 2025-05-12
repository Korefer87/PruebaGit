const companyId = '2768'; // Tu Company ID conocido

document.getElementById("fetch-guests").addEventListener("click", async () => {
    const outputTable = document.getElementById("guest-table").querySelector("tbody");

    outputTable.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

    try {
        const response = await fetch("https://sour-overjoyed-port.glitch.me/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ company_id: companyId }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        outputTable.innerHTML = ""; // Limpia la tabla

        if (data && data.bookings && data.bookings.length > 0) {
            data.bookings.forEach(booking => {
                const guest = booking.booking_customer;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${guest.customer_name || "N/A"}</td>
                    <td>${guest.email || "N/A"}</td>
                    <td>${guest.phone || "N/A"}</td>
                    <td>${booking.check_in_date || "N/A"} - ${booking.check_out_date || "N/A"}</td>
                `;
                outputTable.appendChild(row);
            });
        } else {
            outputTable.innerHTML = "<tr><td colspan='4'>No booking details found.</td></tr>";
        }
    } catch (error) {
        outputTable.innerHTML = `<tr><td colspan='4'>Request failed: ${error.message}</td></tr>`;
        console.error("Error fetching guest data:", error);
    }
});
