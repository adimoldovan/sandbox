if [[ $BUILDKITE_RETRY_COUNT -lt 2 ]]; then
  echo "Failing, because BUILDKITE_RETRY_COUNT is less than 2"
  exit 1
fi
