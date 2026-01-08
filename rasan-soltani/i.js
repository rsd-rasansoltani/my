    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('status');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      statusDiv.textContent = "Sending... ⏳";
      const data = Object.fromEntries(new FormData(form));

      try {
        const res = await fetch('https://my.r8sansoltani.workers.dev/?chat=7650517255', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();
        if(result.status === "ok"){
          statusDiv.textContent = "✅ Message sent successfully!";
          form.reset();
        } else {
          statusDiv.textContent = "❌ Error sending message: " + result.message;
        }

      } catch(err){
        statusDiv.textContent = "❌ Error sending message: " + err.message;
      }
    });