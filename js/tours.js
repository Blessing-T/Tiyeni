document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('YOUR_PUBLIC_KEY');

    const checkboxes = document.querySelectorAll('.activities input[type="checkbox"]');
    const peopleInput = document.getElementById('people');
    const totalSpan = document.getElementById('total');
    const bookingForm = document.getElementById('bookingForm');
    const dateInput = document.getElementById('date');

    function calculateTotal() {
        let total = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += parseInt(cb.value);
            }
        });
        total *= parseInt(peopleInput.value) || 1;
        totalSpan.textContent = total;
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', calculateTotal);
    });

    peopleInput.addEventListener('input', calculateTotal);

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedActivities = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                selectedActivities.push(cb.getAttribute('data-name'));
            }
        });
        if (selectedActivities.length === 0) {
            alert('Please select at least one activity.');
            return;
        }
        const people = peopleInput.value;
        const date = dateInput.value;
        const total = totalSpan.textContent;

        const templateParams = {
            to_email: 'musiringofatariro@gmail.com',
            activities: selectedActivities.join(', '),
            people: people,
            date: date,
            total: total
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                alert('Booking request sent successfully!');
                bookingForm.reset();
                totalSpan.textContent = '0';
            }, function(error) {
                alert('Failed to send booking request. Please try again.');
                console.error('EmailJS error:', error);
            });
    });
});