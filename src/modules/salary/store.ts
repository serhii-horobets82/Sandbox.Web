import { Module } from "vuex";
import { ModuleInfo, ModuleState, GlobalState } from "@/types/global";

export const moduleInfo: ModuleInfo = {
  moduleId: "salary",
  actions: ["view", "edit"]
};

export const getDefaultState = () => {
  return {
    isError: false,
    isLoading: false
  };
};

const state: ModuleState = getDefaultState();
const namespaced: boolean = true;

export const salary: Module<ModuleState, GlobalState> = {
  namespaced,
  state
};
