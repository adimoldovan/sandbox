if [[ $BUILDKITE_RETRY_COUNT ]] -lt 2; then
  exit 1
fi
