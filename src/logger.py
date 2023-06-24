from colorama import Fore, Style

class Logger:
    """This utility class is used to log messages to the console."""

    prefix = {
        'info': Fore.CYAN + Style.BRIGHT + "info"
    }
    
    @staticmethod
    def info(msg):
        print("[{}{}]: {}".format(Logger.prefix['info'], Fore.RESET, msg))