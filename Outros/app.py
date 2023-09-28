import getpass
import smtplib
from time import sleep


class envio():
    def enviaremail(self):
            try:
                self.msgfrom = 'tpcriacao@gmail.com'
                self.smtpobj = smtplib.SMTP('smtp.gmail.com', 587)
                self.smtpobj.ehlo()
                self.smtpobj.starttls()
                self.msgto = '0137.noreply@cnec.br'
                self.senhapadrao = '@1203120='
                # print('1 - PARA SENHA PADRÃO')
                # self.password = input('2 - PARA DIGITAR A SENHA:''\n')
                self.smtpobj.login(self.msgto, self.senhapadrao)
                self.msg = f'''
                    EMAIL TESTE PARA ENVIO EXTERNO DO EMAIL {getpass.getuser()}@cnec.br
                    '''
                self.smtpobj.sendmail(self.msgto, self.msgfrom, 'Subject: EMAIL TESTE ENVIO EXTERNO\n{}'.format(self.msg))
                self.teste = self.smtpobj.verify(self.msgfrom)
                self.smtpobj.quit()
                print("EMAIL EXTERNO ENVIADO COM SUCESSO!!")
                
                sleep(2)
            except smtplib.SMTPRecipientsRefused:
                print("EMAIL EXTERNO NÃO PODE SER ENVIADO")
                sleep(2)
            except smtplib.SMTPAuthenticationError:
                print('A senha está incorreta:')
                self.enviaremail()

if __name__=='__main__':
    while True:
        au = envio()
        au.enviaremail()