import getpass
import smtplib
from time import sleep


class envio():
    def leranexo(self):
        arquivo = open('anexo.txt', 'r')
        self.anexo = arquivo.read()
        arquivo.close()
        return self.anexo
    
    def enviaremail(self):
            try:
                self.msgfrom = 'robson.thiago@ipnet.cloud'
                self.smtpobj = smtplib.SMTP('smtp.gmail.com', 587)
                self.smtpobj.ehlo()
                self.smtpobj.starttls()
                self.msgto = '0137.noreply@cnec.br'
                self.senhapadrao = '@1203120='
                # print('1 - PARA SENHA PADRÃO')
                # self.password = input('2 - PARA DIGITAR A SENHA:''\n')
                self.smtpobj.login(self.msgto, self.senhapadrao)
                self.msg = 'Subject: {}\n\n{}'.format('Envio de email', self.leranexo())
                self.smtpobj.sendmail(self.msgto, self.msgfrom, 'Subject: Envio do Log do Cloud Build!!\n{}'.format(self.msg))
                self.teste = self.smtpobj.verify(self.msgfrom)
                self.smtpobj.quit()
                print("Envio do Log do Cloud Build!!")
                
                sleep(2)
            except smtplib.SMTPRecipientsRefused:
                print("EMAIL EXTERNO NÃO PODE SER ENVIADO")
                sleep(2)
            except smtplib.SMTPAuthenticationError:
                print('A senha está incorreta:')
                self.enviaremail()

if __name__=='__main__':
    #while True:
    au = envio()
    au.enviaremail()