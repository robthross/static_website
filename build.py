import os


def app():
    print(os.getlogin())
    print(os.uname())

if __name__ == "__main__":
    app()