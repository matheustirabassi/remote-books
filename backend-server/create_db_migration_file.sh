current_time=$(date "+%Y%m%d%H%M%S")
description=`echo $@ | tr '[:upper:]' '[:lower:]'`
description=`echo $description | sed -e "s/ /\_/g"`
file_name="V"$current_time"__"$description".sql"

touch "src/main/resources/db/migration/"$file_name
echo "Arquivo criado: $file_name"
