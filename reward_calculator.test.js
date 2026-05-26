/**
 * HỆ THỐNG TÍCH ĐIỂM - MEGAMART (LEGACY CODE)
 * Tình trạng: Chứa lỗi logic nghiêm trọng tại các điểm rẽ nhánh điều kiện.
 */
function calculateRewardPoints(customerTier, orderTotal) {
    let points = 0;

    if (customerTier === "MEMBER") {
        points = orderTotal / 10000;

    } else if (customerTier === "VIP") {

        // LỖI: thiếu trường hợp orderTotal === 500000
        if (orderTotal >= 500000) {
            points = (orderTotal / 10000) * 2;

        } else if (orderTotal < 500000) {
            points = orderTotal / 10000;
        }

    } else {
        return -1;
    }

    return Math.floor(points);
}

/**
 * HÀM ASSERT
 * So sánh expected và actual
 */
function assertEquals(expected, actual, testName) {

    if (expected !== actual) {

        console.error(
            `❌ FAILED: ${testName}
Expected: ${expected}
Actual: ${actual}`
        );

        // Có thể throw error để dừng chương trình
        throw new Error(`${testName} FAILED`);

    } else {

        console.log(
            `%c✅ PASSED: ${testName}`,
            "color: green; font-weight: bold;"
        );
    }
}

/**
 * UNIT TESTS
 */

// Test VIP > 500k
function testVIPAbove500k() {

    const result = calculateRewardPoints("VIP", 600000);

    assertEquals(
        120,
        result,
        "VIP đơn hàng 600k phải nhận 120 điểm"
    );
}

// Test VIP < 500k
function testVIPBelow500k() {

    const result = calculateRewardPoints("VIP", 200000);

    assertEquals(
        20,
        result,
        "VIP đơn hàng 200k phải nhận 20 điểm"
    );
}

// Test BUG: VIP đúng bằng 500k
function testVIPExact500k() {

    const result = calculateRewardPoints("VIP", 500000);

    // Kỳ vọng business rule:
    // VIP từ 500k trở lên x2 điểm
    assertEquals(
        100,
        result,
        "VIP đơn hàng đúng 500k phải nhận 100 điểm"
    );
}

// Test MEMBER
function testMember() {

    const result = calculateRewardPoints("MEMBER", 300000);

    assertEquals(
        30,
        result,
        "MEMBER đơn hàng 300k phải nhận 30 điểm"
    );
}

// Test tier không hợp lệ
function testInvalidTier() {

    const result = calculateRewardPoints("GOLD", -500000);

    assertEquals(
        -1,
        result,
        "Tier không hợp lệ phải trả về -1"
    );
}

/**
 * CHẠY TOÀN BỘ TEST
 */
function runAllTests() {

    console.log("===== RUN UNIT TEST =====");

    testVIPAbove500k();
    testVIPBelow500k();
    testVIPExact500k();

    testMember();
    testInvalidTier();

    console.log("===== DONE =====");
}

runAllTests();