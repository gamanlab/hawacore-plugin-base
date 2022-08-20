import { RouteLocationNormalizedLoaded } from "vue-router";

function useAutoRefresh(
  route: RouteLocationNormalizedLoaded,
  fn: () => Promise<void>
) {
  let timeout = 1000;
  let destroyed = false;

  const handler = () => {
    setTimeout(async () => {
      if (destroyed) return;

      try {
        if (route.query.refresh) {
          timeout = parseInt(<string>route.query.refresh);
          if (timeout < 100) {
            timeout = 1000;
          }
          await fn();
        }
      } catch (ex) {
        console.error(`Error raised on ticker [${route.path}]`, ex);
      }
      handler();
    }, timeout);
  };

  const onMounted = async () => {
    await fn();
    handler();
  };

  const onBeforeUnmount = () => {
    destroyed = true;
  };

  return {
    onMounted,
    onBeforeUnmount,
  };
}

export { useAutoRefresh };
