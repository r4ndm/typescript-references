// Entry point
import { delay } from './delay';
import { User, UserDetails } from './User';

function dummyValue(): number {
    return 404;
}

async function getPromiseTest(): Promise<void> {
    const one = new Promise<string>(resolve => {
        console.log('In one impl.');

        // do some hard work here using either callback or async or another promise
        console.log('Doing long running hard work');
        let result = 'result of hard work';

        // then call whatever the caller wants
        resolve(result);

        // after resolve
        result = 'modified result';
        console.log(`End of one impl. Result = ${result}`);
    });

    const chainResult = one
        .then(value => {
            console.log(`In two impl. Got input ${value}`);
            return 42;
        })
        .then(value => {
            console.log(`In three impl. Got input ${value}`);
            return true;
        })
        .then(value => {
            console.log(`In four impl. Got input ${value}`);
            // return 'FOUR';
            return Promise.resolve('FOUR'); // return Promise.resolve can be used instead of return. Same effect
        })
        .then(value => {
            console.log(`In five impl. Got input ${value}`);

            // Since there is no return, the next one doesn't get any value
            // If returning a value, return Promise.resolve is required
            Promise.resolve(88);

            // In this case we can have code after since there is no return from resolve
            console.log('In five impl after resolve');

            // Second call to Promise.resolve(). Won't do anything since it is already resolved
            Promise.resolve();
        })
        .then(value => {
            console.log(`In six impl. Got input ${value}`);
        });

    await delay(2000);

    chainResult
        .then(value => {
            console.log(`In chainresult1 got value ${value}`);
            return 55.55;
        })
        .then(value => {
            console.log(`In chainresult2 got value ${value}`);
            return new Promise(resolve => {
                console.log('Inside newly created promise');
                resolve('mypromisevalue');
            });
        })
        .then(value => {
            console.log(`In chainresult3 got value ${value}`);
            // call a function but don't return the value from here
            // subsquent resolve will not get the return value
            dummyValue;
        })
        .then(value => {
            console.log(`In chainresult4 got value ${value}`);
        });
}

function usersWithPromise(): void {
    // getUser
    // getUserDetails
    // in parallel: getFriends, getAccounts, getPurchaseHistory
    // generateReport

    const id = 12343;
    let userDetails: UserDetails;
    let friends: User[];
    let accounts: string[];
    let purchases: string[];

    console.time('promise');

    // 2s
    console.log('getting user...');
    const user = User.getUserPromise(id);

    user.then(user => {
        // 5s
        console.log('getting user details...');
        return User.getUserDetailsPromise(user);
    })
        .then((details: UserDetails) => {
            userDetails = details;

            console.log('getting related data in parallel...');
            // In parallel, run the three methods asynchronously
            // Note the return from Promise.All is required for the next resolve to get the results
            return Promise.all([
                User.getFriendsPromise(userDetails.userId), // 3a
                User.getAccountsPromise(userDetails.userId), // 1s
                User.getPurchaseHistoryPromise(userDetails.userId) // 2s
            ]);
        })
        .then((result: [User[], string[], string[]]) => {
            [friends, accounts, purchases] = result;

            console.log('generating report...');
            // Generate report after all methods are done
            // 4s
            return User.generateReportPromise(userDetails.userId, userDetails, friends, accounts, purchases);
        })
        .then(value => {
            // All done
            // Should be 14s
            const timeTaken = console.timeEnd('promise');
            console.log('finsihed');
        });
}

async function usersAsync(): Promise<void> {
    const id = 12343;

    console.time('async total');

    // 2s
    process.stdout.write('getting user...');
    console.time('getuser');
    const user = await User.getUserPromise(id);
    console.timeEnd('getuser');

    process.stdout.write('getting user details...');
    console.time('getuserdetails');
    const userDetails = await User.getUserDetailsPromise(user);
    console.timeEnd('getuserdetails');

    // Running async methods in parallel could be done two ways
    process.stdout.write('getting related info in parallel...');
    console.time('getuserrelatedinfo');
    // Option 1: with Promise.All
    // const [friends, accounts, purchases] = await Promise.all([
    //     User.getFriendsPromise(userDetails.userId), // 3a
    //     User.getAccountsPromise(userDetails.userId), // 1s
    //     User.getPurchaseHistoryPromise(userDetails.userId) // 2s
    // ]);

    // Option 2: straight up await
    // However you don't want to do this as it makes it sequential
    // friends = await User.getFriendsPromise(userDetails.userId)
    // accounts = await User.getAccountsPromise(userDetails.userId)
    // purchases = await User.getPurchaseHistoryPromise(userDetails.userId)

    // you want to do this:
    const friendsPromise = User.getFriendsPromise(userDetails.userId);
    const accountsPromise = User.getAccountsPromise(userDetails.userId);
    const purchasesPromise = User.getPurchaseHistoryPromise(userDetails.userId);

    // then await the promises
    const friends = await friendsPromise;
    const accounts = await accountsPromise;
    const purchases = await purchasesPromise;

    console.timeEnd('getuserrelatedinfo');

    console.log('generating report...');
    console.time('generatereport');
    await User.generateReportPromise(userDetails.userId, userDetails, friends, accounts, purchases);
    console.timeEnd('generatereport');

    console.log('---------------------');
    const timeTaken = console.timeEnd('async total');
}

class Main {
    public static async main(): Promise<void> {
        // await getPromiseTest();

        // usersWithPromise();

        await usersAsync();
    }
}

Main.main();
