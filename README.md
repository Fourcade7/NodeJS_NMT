                  sudo apt update
                  sudo apt install -y curl
                  curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
                  sudo apt install -y nodejs

                  node -v
                  npm -v


                    1.Install NodeJS  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
                  
                  sudo apt install -y mysql-server
                  sudo systemctl status mysql
                  mysql --version

change password user:
                      
                      
                      
                      mysql -u root -p
                      ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'o\'zingizning_parolingiz';
                      FLUSH PRIVILEGES;
                      EXIT;



                   
          
                    sudo npm install -g pm2
                    pm2 -v
                    pm2 start server.js
                    pm2 start server.js --name myapp
                    pm2 list
                    pm2 stop all
                    pm2 stop 0
                    pm2 logs myapp


                  
