import configuratorStore from "../store/configuratorStore";

export function getItems(type) {
  return configuratorStore((state) =>
    state.itemsOnModel.filter((item) => item.type === type)
  );
}
