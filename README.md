# sampleapp
Sample App For Quick Setup of Django and Setup It On Aws

1. Rename the Application Name as per you want for your application. Change the Name of the Folders samplename ==>  {{applicationname}}

2. Search For All the TODO comments in the app and replace their with your application name

3. Push Your code on the git 

4. Try to make a test run check everything working fine on your local or not.

5. Setup a Ec2 instance (AMI Ubuntu 14.04 64 Bit) on the AWS and make ssh on the ec2 instance.

6. Setup the ssh key on instance for git repo.

7. Use the Resource/Server init Command/init_server.sh and make the changes as per your application name and git clone url

8. Copy the modified init.sh into the /home/ubuntu/init.sh using the copy from local and paste on the ssh console.

9. Run `sh init.sh`

10. Then need to update the apache2 conf file as per your application name. You can use the template here Resource/APACHE/apache_file.

11. After Modify it copy that file into the `sudo vim /etc/apache2/site-available/000.conf`. Remove or comment the previous code from the file.

12. Run `sudo service apache2 restart`

13. If everything works fine your application will be hosted on the ec2 cname url

14. Now configure the DB and other settings as per the environment (staging, production etc)

15. Use the Resources/ENV_FILE/env_file.txt for adding the global environment variable for both Apache and Ubuntu System so the python application can read it

16. You need to logout from the ec2 machine and login in back to make the global environment variable work.

17. Restart Apache2 server `sudo service apache2 restart`


