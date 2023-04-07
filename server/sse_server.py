from asyncio import sleep
import tornado.ioloop
import tornado.web

push_flag = True

class ServerSentEvent(tornado.web.RequestHandler):
    def __init__(self, *args, **kwargs):
        super(ServerSentEvent, self).__init__(*args, **kwargs)
        self.set_header('Content-Type', 'text/event-stream')
        self.set_header('Access-Control-Allow-Origin', "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header("Access-Control-Allow-Methods", "*")

    # Close Connection
    def on_finish(self):
        print("Close Connection")
        return super().on_finish()

    async def get(self):
        print("Build Connection")
        while True:
            if push_flag:
                print("Connecting...")
                self.write("event: message\n")
                self.write("data: " + "<a class=\"text text-success\" target=\"_blank\" href=\"https://www.google.com\">server data<a/>" + "\n\n")
                self.flush()
                await sleep(1)


def make_app():
    return tornado.web.Application([
        (r"/sse/data/", ServerSentEvent),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    print("SSE service start")
    tornado.ioloop.IOLoop.current().start()
