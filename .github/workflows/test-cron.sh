echo "$CRON"


if [ "$CRON" == "*/15 * * * *" ]; then
	echo 'Every 15 minutes!'
fi

if [ "$CRON" == "*/20 * * * *" ]; then
	echo 'Every 20 minutes!'
fi