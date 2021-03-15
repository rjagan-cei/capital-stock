import { Base } from "./base";

export class Member {
    id: Number;
    name: String;
    status: String;
    dateOfIncorporation: Date;
    stockMembershipDate: Date;
    totalAssets: Number;
}


export let mockedMember: Member[] = [{
    id: 1,
    name: 'testMember1',
    status: 'Active',
    dateOfIncorporation: new Date(2021, 1, 15),
    stockMembershipDate: new Date(2021, 2, 15),
    totalAssets: 12345678.00
}];
