while true; do
  mysql -u root -p'nayankumar' -D Product -e "SELECT * FROM Users;" # {{ edit_1 }}
  sleep 5 # {{ edit_2 }} 
done