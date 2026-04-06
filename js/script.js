document.addEventListener('DOMContentLoaded', function() {
    
    // 🔥 ضع الرابط الذي ستحصل عليه من Formspree أو Web3Forms هنا
    // مثال: 'https://formspree.io/f/xabcdefg'
    const emailServiceEndpoint = 'https://formspree.io/f/xdapyayj'; 

    // دالة عامة للتعامل مع أي نموذج في الموقع
    function setupForm(formId, serviceName) {
        const form = document.getElementById(formId);
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault(); // منع إعادة تحميل الصفحة
                
                // تغيير نص الزر أثناء الإرسال
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerText;
                submitBtn.innerText = 'جاري الإرسال...';
                submitBtn.disabled = true;

                // جمع بيانات النموذج
                const formData = new FormData(form);
                
                // إضافة اسم الخدمة لتعرف في الإيميل من أي صفحة جاء الطلب
                formData.append('الخدمة_المطلوبة', serviceName);
                formData.append('_replyto', 'tonysyds25@gmail.com');
                formData.append('_subject', `طلب جديد من موقع التوني كلين - ${serviceName}`);

                // إرسال البيانات
                fetch(emailServiceEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // إظهار رسالة النجاح
                        const successMsg = form.parentElement.querySelector('#successMsg');
                        if(successMsg) {
                            successMsg.classList.remove('d-none');
                            // إخفاء الرسالة بعد 5 ثواني
                            setTimeout(() => {
                                successMsg.classList.add('d-none');
                            }, 5000);
                        }
                        form.reset(); // تفريغ الحقول
                    } else {
                        alert('عذراً، حدث مشكلة أثناء إرسال الطلب. يرجى التأكد من الرابط الخاص بخدمة الإيميل.');
                    }
                })
                .catch(error => {
                    alert('خطأ في الاتصال بالشبكة. يرجى المحاولة لاحقاً.');
                })
                .finally(() => {
                    // إعادة الزر لحالته الطبيعية
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
            });
        }
    }

    // تفعيل النماذج في الصفحات المختلفة
    setupForm('homeForm', 'تنظيف منازل وشقق');
    setupForm('steamForm', 'غسيل بالبخار');
    setupForm('tankForm', 'تنظيف خزانات وواجهات');

});

// دالة التقييم الموجودة في صفحة (من نحن)
// تم دمجها هنا ليكون الكود منظماً، ويمكنك إزالة كود الـ <script> من أسفل ملف about.html
let totalRatings = 5120;
let count5 = 4710;

window.rateService = function(stars) {
    if (stars === 5) {
        count5++; 
        totalRatings++;
        
        const totalCountEl = document.getElementById('totalCount');
        const bar5El = document.getElementById('bar5');
        
        if(totalCountEl) totalCountEl.innerText = totalRatings;
        if(bar5El) bar5El.style.width = ((count5/totalRatings)*100) + '%';
    }
    
    const thankYouMsg = document.getElementById('thankYouMsg');
    if(thankYouMsg) {
        thankYouMsg.style.display = 'block';
        setTimeout(() => { 
            thankYouMsg.style.display = 'none'; 
        }, 3000);
    }
}