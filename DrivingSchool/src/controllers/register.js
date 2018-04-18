class Registry {
    getRequests() {
        return [
            {
                number: 4,
                firstName: 'John',
                lastName: 'John',
                phone: '0755110011'
            },
            {
                number: 5,
                firstName: 'John',
                lastName: 'John',
                phone: '0755110012'
            },
            {
                number: 6,
                firstName: 'John',
                lastName: 'John',
                phone: '0755110013'
            },
            {
                number: 7,
                firstName: 'John',
                lastName: 'John',
                phone: '0755110014'
            },
        ];
    }
}

module.exports = new Registry();