import { useEffect } from "react";
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";

const useOnScroll = (scrollFn) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const scrolls$ = fromEvent(window, "scroll").pipe(
      throttleTime(1000),
      catchError((err) => ({ error: " error listening to scroll event" }))
    );

    const eventsSubscription = scrolls$.subscribe((evt) => {
      if (evt.error) {
        setError(evt.error);
      } else {
        scrollFn(evt);
      }
     
    });

    return () => {
      eventsSubscription.unsubscribe();
    };
  });

  return [error];
};

export default useOnScroll;
