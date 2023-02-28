import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); //
  });

  it("keep track of it user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job tyoes that the user would like to filter by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe("loginUser", () => {
    it("log the user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user apply for the job filter", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Google", "Microsoft"]);
      expect(store.selectedOrganizations).toEqual(["Google", "Microsoft"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates jobs types that the user apply for the job filter", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Full-time"]);
      expect(store.selectedJobTypes).toEqual(["Full-time"]);
    });
  });
});
