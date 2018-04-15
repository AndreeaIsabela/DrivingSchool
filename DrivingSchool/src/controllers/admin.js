class AdminController {
    getAdmins() {
        return [
            {
                name: 'Drogon'
            },
            {
                name: 'Jon Snow'
            },
            {
                name: 'Khaleesi'
            }
        ];
    }
}

module.exports = new AdminController();