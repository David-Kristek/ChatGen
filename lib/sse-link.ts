import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
} from "@apollo/client/core";
import { print } from "graphql";

interface SSELinkOptions {}

class SSELink extends ApolloLink {
  constructor(private options: EventSourceInit & { url: string }) {
    super();
  }

  public request(operation: Operation): Observable<FetchResult> {
    const url = new URL(this.options.url);
    url.searchParams.append("query", print(operation.query));
    url.searchParams.append("variables", JSON.stringify(operation.variables));

    return new Observable((sink) => {
      const eventsource = new EventSource(url.toString(), this.options);
      eventsource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        sink.next(data);
        if (eventsource.readyState === 2) {
          sink.complete();
        }
      };
      eventsource.onerror = function (error) {
        sink.error(error);
      };
      return () => eventsource.close();
    });
  }
}

export const sseLink = new SSELink({
  url: "http://localhost:3000/api/graphql",
});
