                  sudo apt update
                  sudo apt install -y curl
                  curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
                  sudo apt install -y nodejs

                  node -v
                  npm -v



                  
                  sudo apt install -y mysql-server
                  sudo systemctl status mysql
                  mysql --version

change password user:
                      
                      
                      
                      mysql -u root -p
                      ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'o\'zingizning_parolingiz';
                      FLUSH PRIVILEGES;
                      EXIT;



                     


                  
