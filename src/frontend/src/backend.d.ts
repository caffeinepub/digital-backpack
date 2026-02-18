import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface BackpackItem {
    id: bigint;
    weight: number;
    name: string;
    description: string;
    quantity: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createItem(name: string, quantity: bigint, description: string, weight: number): Promise<BackpackItem>;
    deleteItem(itemId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getItem(itemId: bigint): Promise<BackpackItem>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasBackpack(): Promise<boolean>;
    initializeBackpack(): Promise<boolean | null>;
    isCallerAdmin(): Promise<boolean>;
    listItems(): Promise<Array<BackpackItem>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateItem(itemId: bigint, name: string, quantity: bigint, description: string, weight: number): Promise<void>;
}
