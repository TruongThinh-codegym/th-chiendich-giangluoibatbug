/**
 * HỆ THỐNG TÍCH ĐIỂM - MEGAMART (LEGACY CODE)
 * Tình trạng: Chứa lỗi logic nghiêm trọng tại các điểm rẽ nhánh điều kiện.
 */
function calculateRewardPoints(customerTier, orderTotal) {
    let points = 0;

    if (customerTier === "MEMBER") {
        points = orderTotal / 10000;
    } else if (customerTier === "VIP") {
        // LỖI LOGIC ĐIỀU KIỆN: Bỏ sót trường hợp orderTotal đúng bằng 500000
        if (orderTotal >= 500000) { 
            points = (orderTotal / 10000) * 2;
        } else if (orderTotal < 500000) {
            points = orderTotal / 10000;
        }
    } else {
        return -1; // Trạng thái lỗi: Hạng khách hàng không hợp lệ
    }

    return Math.floor(points);
}

// CÁCH TEST THỦ CÔNG CỦA DEV CŨ (Rất rủi ro vì không tự động báo lỗi)
console.log("Test VIP 600k:", calculateRewardPoints("VIP", 600000)); // Ra 120 (Đúng)
console.log("Test VIP 200k:", calculateRewardPoints("VIP", 200000)); // Ra 20 (Đúng)
console.log("Test VIP 500k:", calculateRewardPoints("VIP", 500000)); // Ra 100 (Đúng)
// Dev cũ quên test mốc 500k!