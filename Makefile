# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: gcollet <gcollet@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/10/03 13:51:00 by gcollet           #+#    #+#              #
#    Updated: 2022/10/04 12:31:17 by gcollet          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

RED			=	\033[31;1m
END			=	\033[0m
VOLUMES		=	$(eval MY_VOL=$(shell docker volume ls -q))

all: up

up:
		docker-compose -f docker-compose.yml up --build

down:
		docker-compose -f docker-compose.yml down
		
clean:
		docker-compose -f docker-compose.yml down --rmi all

fclean: clean
		@echo "$(RED)WARNING: THIS OPERATION CAN TAKE UP TO 10 MIN... $(END)"
		$(VOLUMES)
		rm -rf ./api/node_modules
		rm -rf ./app/node_modules
		rm -rf ./api/dist
		rm -rf ./mydatabase
		docker container prune --force
		docker images prune
		docker system prune --force
		docker volume rm -f $(MY_VOL) || true

.PHONY: all up down clean fclean