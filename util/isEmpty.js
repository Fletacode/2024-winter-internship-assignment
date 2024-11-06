function isEmpty(value) {
    // 1. null 또는 undefined는 비어있다고 간주
    if (value === null || value === undefined) {
        return true;
    }

    // 2. 원시 타입(숫자, 불리언 등) 검사
    if (typeof value !== 'object') {
        // 빈 문자열만 비어있다고 간주
        return value === '';
    }

    // 3. 배열인 경우, 모든 요소가 비어있는지 검사
    if (Array.isArray(value)) {
        return value.every(isEmpty);
    }

    // 4. 객체인 경우, 모든 속성 값이 비어있는지 검사
    if (typeof value === 'object') {
        return Object.keys(value).length === 0 || Object.values(value).every(isEmpty);
    }

    // 나머지 경우 비어있지 않음
    return false;
}

module.exports = {isEmpty};

