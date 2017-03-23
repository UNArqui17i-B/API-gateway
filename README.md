# BlinkBox
> Entry point for app deployment

## Users deployment
```bash
docker-compose -f users_compose.yml build
docker-compose -f users_compose.yml pull
docker-compose -f users_compose.yml up
```

## Files deployment
```bash
docker-compose -f files_compose.yml build
docker-compose -f files_compose.yml pull
docker-compose -f files_compose.yml up
```
