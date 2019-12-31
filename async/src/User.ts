export class UserDetails {
    public userId: number;
    public username: string;
    public firstName: string;
    public lastName: string;

    constructor(userId: number, userName: string, firstName: string, lastName: string) {
        this.userId = userId;
        this.username = userName;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export class User {
    private _userId: number;

    get userId(): number {
        return this._userId;
    }

    constructor(userId: number) {
        this._userId = userId;
    }

    private static getUser(id: number): User {
        return new User(id);
    }

    public static getUserPromise(id: number): Promise<User> {
        // Spend 2s for long running task and return User
        return new Promise<User>(resolve =>
            setTimeout(() => {
                resolve(User.getUser(id));
            }, 2000)
        );
    }

    public static getUserDetailsPromise(user: User): Promise<UserDetails> {
        //Spend 5s for long running task and return UserDetails
        return new Promise<UserDetails>((resolve, reject) =>
            setTimeout(() => {
                if (user.userId === null) {
                    return reject('Invalid user');
                }

                resolve(new UserDetails(user.userId, 'rhero', 'Rambo', 'Hero'));
            }, 5000)
        );
    }

    public static getFriendsPromise(userId: number): Promise<User[]> {
        // Spend 3s for long running task and return Friends
        return new Promise<User[]>((resolve, reject) =>
            setTimeout(() => {
                if (userId === null) {
                    return reject('Invalid user');
                }

                const friends = [new User(500), new User(501), new User(502)];
                resolve(friends);
            }, 3000)
        );
    }

    public static getAccountsPromise(userId: number): Promise<string[]> {
        // Spend 1s for long running task and return Friends
        return new Promise<string[]>((resolve, reject) =>
            setTimeout(() => {
                if (userId === null) {
                    return reject('Invalid user');
                }

                const accountIds = ['acct1', 'acct2'];
                resolve(accountIds);
            }, 2000)
        );
    }

    public static getPurchaseHistoryPromise(userId: number): Promise<string[]> {
        // Spend 2s for long running task and return Friends
        return new Promise<string[]>((resolve, reject) =>
            setTimeout(() => {
                if (userId === null) {
                    return reject('Invalid user');
                }

                const purchaseIds = ['pid1', 'pid2', 'pid3'];
                resolve(purchaseIds);
            }, 2000)
        );
    }

    public static generateReportPromise(
        userId: number,
        user: UserDetails,
        friends: User[],
        accounts: string[],
        purchases: string[]
    ): Promise<void> {
        // Spend 4s for long running task to generate report

        return new Promise<void>(resolve =>
            setTimeout(() => {
                if (userId === null) {
                    return;
                }

                console.log(`Report for ${user.firstName} ${user.lastName}`);
                console.log(`   User Id: ${userId}`);
                console.log(`   User name: ${user.username}`);
                console.log(`   Friends: ${friends.length}`);
                console.log(`   Accounts: ${accounts}`);
                console.log(`   Purchases: ${purchases}`);

                resolve();
            }, 4000)
        );
    }
}
