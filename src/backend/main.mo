import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type BackpackItem = {
    id : Nat;
    name : Text;
    quantity : Nat;
    description : Text;
    weight : Float;
  };

  module BackpackItem {
    public func compareItemId(a : BackpackItem, b : BackpackItem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let backpacks = Map.empty<Principal, Map.Map<Nat, BackpackItem>>();
  var nextItemId = 0;

  // User Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Backpack Management Functions
  public shared ({ caller }) func createItem(name : Text, quantity : Nat, description : Text, weight : Float) : async BackpackItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create items");
    };
    switch (backpacks.get(caller)) {
      case (null) { Runtime.trap("Backpack does not exist") };
      case (?userBackpack) {
        let item : BackpackItem = {
          id = nextItemId;
          name;
          quantity;
          description;
          weight;
        };
        nextItemId += 1;
        userBackpack.add(item.id, item);
        item;
      };
    };
  };

  public query ({ caller }) func getItem(itemId : Nat) : async BackpackItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access items");
    };
    switch (backpacks.get(caller)) {
      case (null) { Runtime.trap("Backpack does not exist") };
      case (?userBackpack) {
        switch (userBackpack.get(itemId)) {
          case (null) { Runtime.trap("Item does not exist") };
          case (?item) { item };
        };
      };
    };
  };

  public query ({ caller }) func listItems() : async [BackpackItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list items");
    };
    switch (backpacks.get(caller)) {
      case (null) { Runtime.trap("Backpack does not exist") };
      case (?userBackpack) {
        userBackpack.values().toArray().sort(BackpackItem.compareItemId);
      };
    };
  };

  public shared ({ caller }) func updateItem(itemId : Nat, name : Text, quantity : Nat, description : Text, weight : Float) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update items");
    };
    switch (backpacks.get(caller)) {
      case (null) { Runtime.trap("Backpack does not exist") };
      case (?userBackpack) {
        if (not userBackpack.containsKey(itemId)) {
          Runtime.trap("Item does not exist");
        };
        let updatedItem : BackpackItem = {
          id = itemId;
          name;
          quantity;
          description;
          weight;
        };
        userBackpack.add(itemId, updatedItem);
      };
    };
  };

  public shared ({ caller }) func deleteItem(itemId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete items");
    };
    switch (backpacks.get(caller)) {
      case (null) { Runtime.trap("No backpack found for user") };
      case (?userBackpack) {
        if (not userBackpack.containsKey(itemId)) {
          Runtime.trap("Item does not exist");
        };
        userBackpack.remove(itemId);
      };
    };
  };

  public shared ({ caller }) func initializeBackpack() : async ?Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initialize backpacks");
    };
    if (not backpacks.containsKey(caller)) {
      backpacks.add(caller, Map.empty<Nat, BackpackItem>());
      ?true;
    } else {
      ?false;
    };
  };

  public query ({ caller }) func hasBackpack() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check backpack status");
    };
    backpacks.containsKey(caller);
  };
};
